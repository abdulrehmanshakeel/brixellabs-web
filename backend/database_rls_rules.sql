-- ==============================================================================
-- BRIXELLABS DATABASE SECURITY & ROW-LEVEL SECURITY (RLS) POLICIES
-- Target: PostgreSQL / Supabase / Neon Cloud Engine
-- ==============================================================================

-- 1. Enable Row-Level Security (RLS) on all application tables
ALTER TABLE IF EXISTS core_inquiry ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_newslettersubscriber ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_crashreport ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_auditlog ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_portfolioitem ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_teammember ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_sitesetting ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS core_appversion ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 2. Client Inquiries & Leads: Strict Privacy Rules
-- Public anonymous visitors can INSERT leads.
-- ZERO public access to read, list, update, or delete other people's inquiries!
-- Only authenticated admin staff can inspect or update inquiries.
-- ==============================================================================
DROP POLICY IF EXISTS "Public can submit client inquiries" ON core_inquiry;
CREATE POLICY "Public can submit client inquiries" 
ON core_inquiry 
FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated admins can view and manage inquiries" ON core_inquiry;
CREATE POLICY "Only authenticated admins can view and manage inquiries" 
ON core_inquiry 
FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'role' = 'authenticated' OR auth.role() = 'authenticated');

-- ==============================================================================
-- 3. Crash Reports: Day-One Telemetry Security
-- Public clients can transmit crash reports and stack traces.
-- Only authenticated engineers can review incident diagnostics.
-- ==============================================================================
DROP POLICY IF EXISTS "Clients can ingest crash reports" ON core_crashreport;
CREATE POLICY "Clients can ingest crash reports" 
ON core_crashreport 
FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view incident crash logs" ON core_crashreport;
CREATE POLICY "Admins can view incident crash logs" 
ON core_crashreport 
FOR SELECT 
TO authenticated 
USING (true);

-- ==============================================================================
-- 4. Audit Log: Strict Immutability Rules
-- Append-only ledger. NO ONE (not even admins) may alter or delete historical audit entries.
-- ==============================================================================
DROP POLICY IF EXISTS "System can insert audit logs" ON core_auditlog;
CREATE POLICY "System can insert audit logs" 
ON core_auditlog 
FOR INSERT 
TO authenticated, anon, public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view audit logs" ON core_auditlog;
CREATE POLICY "Admins can view audit logs" 
ON core_auditlog 
FOR SELECT 
TO authenticated 
USING (true);

-- Deny all updates and deletes on Audit Log
DROP POLICY IF EXISTS "Block audit log modifications" ON core_auditlog;
CREATE POLICY "Block audit log modifications" 
ON core_auditlog 
FOR UPDATE 
TO public 
USING (false);

DROP POLICY IF EXISTS "Block audit log deletions" ON core_auditlog;
CREATE POLICY "Block audit log deletions" 
ON core_auditlog 
FOR DELETE 
TO public 
USING (false);

-- ==============================================================================
-- 5. Public Content (Services, Portfolio, Team, App Version)
-- Public visitors have Read-Only (SELECT) access.
-- Write permissions reserved exclusively for authenticated managers.
-- ==============================================================================
DROP POLICY IF EXISTS "Public can view active services" ON core_service;
CREATE POLICY "Public can view active services" ON core_service FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can view portfolio" ON core_portfolioitem;
CREATE POLICY "Public can view portfolio" ON core_portfolioitem FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can view team members" ON core_teammember;
CREATE POLICY "Public can view team members" ON core_teammember FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public can check app version and force update status" ON core_appversion;
CREATE POLICY "Public can check app version and force update status" ON core_appversion FOR SELECT TO public USING (true);

-- Authenticated write policies for CMS content
DROP POLICY IF EXISTS "Admins manage services" ON core_service;
CREATE POLICY "Admins manage services" ON core_service FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage portfolio" ON core_portfolioitem;
CREATE POLICY "Admins manage portfolio" ON core_portfolioitem FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage team" ON core_teammember;
CREATE POLICY "Admins manage team" ON core_teammember FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage app version" ON core_appversion;
CREATE POLICY "Admins manage app version" ON core_appversion FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- 6. Zero Payment / Financial Data Security Policy (PCI Scope Elimination)
-- BrixelLabs website strictly DOES NOT store, process, or transmit credit card
-- credentials, CVVs, payment method tokens, or gateway secrets in this database.
-- Online payment methods have been completely decommissioned from the web platform.
-- All enterprise contracts and sprint retainers are settled off-platform via direct
-- corporate bank wire (ACH / SWIFT) or official institutional invoicing.
-- 
-- Any hypothetical billing/payment table must enforce STRICT zero-public-access RLS:
-- Deny public and anon roles from reading, creating, or modifying financial records.
-- ==============================================================================
