import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTriangleExclamation, 
  faRotateRight, 
  faHouse, 
  faChevronDown, 
  faChevronUp,
  faEnvelope,
  faBug
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { captureCrash } from '../../utils/crashReporting';
import { CopyButton } from './CopyButton';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      incidentId: null,
      showTechnicalDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const report = captureCrash(error, errorInfo, 'critical');
    this.setState({
      errorInfo,
      incidentId: report?.incidentId || 'INC-CRITICAL'
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      incidentId: null,
      showTechnicalDetails: false
    });
    window.history.pushState({}, '', '/');
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, incidentId, showTechnicalDetails } = this.state;

      return (
        <div className="min-h-screen bg-[#030c14] text-slate-100 flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
          {/* Subtle Ambient Red/Cyan Danger Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-2xl bg-[#030e1a]/95 backdrop-blur-2xl border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(244,63,94,0.15)] text-center">
            
            {/* Glowing Danger Hex / Shield Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)] mb-6 animate-pulse">
              <FontAwesomeIcon icon={faTriangleExclamation} className="text-2xl sm:text-3xl" />
            </div>

            {/* Headline */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
              System Exception Encountered
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
              Our automated crash telemetry has recorded this incident. Our engineering team has been notified.
            </p>

            {/* Incident Reference ID Pill with Copy Button */}
            {incidentId && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-8">
                <span className="text-[11px] font-mono text-slate-400">Incident Reference:</span>
                <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">{incidentId}</span>
                <CopyButton text={incidentId} label="Copy" className="!py-0.5 !px-2 !text-[10px]" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <button
                onClick={this.handleReload}
                className="btn-primary w-full sm:w-auto !py-3 !px-6 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faHouse} className="text-xs" />
                <span>Return to Homepage</span>
              </button>
            </div>

            {/* Direct Engineering Assistance */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span>Need immediate assistance?</span>
              <a
                href={`https://wa.me/923449254864?text=${encodeURIComponent(`Hi BrixelLabs, my app ran into incident ${incidentId || 'error'}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1.5 no-underline"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
                <span>Chat on WhatsApp</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={`mailto:brixellabs@gmail.com?subject=Crash%20Report%20${incidentId || ''}`}
                className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1.5 no-underline"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Email Support</span>
              </a>
            </div>

            {/* Technical Diagnostics Accordion */}
            <div className="mt-8 text-left">
              <button
                type="button"
                onClick={() => this.setState({ showTechnicalDetails: !showTechnicalDetails })}
                className="text-[11px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-2 transition-colors cursor-pointer mx-auto"
              >
                <FontAwesomeIcon icon={faBug} className="text-xs text-slate-500" />
                <span>{showTechnicalDetails ? 'Hide' : 'View'} Developer Diagnostics</span>
                <FontAwesomeIcon icon={showTechnicalDetails ? faChevronUp : faChevronDown} className="text-[10px]" />
              </button>

              {showTechnicalDetails && (
                <div className="mt-3 p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-rose-300/90 overflow-x-auto max-h-48 leading-relaxed">
                  <div className="font-bold text-white mb-1">Error: {error?.toString()}</div>
                  <pre className="text-slate-400 whitespace-pre-wrap">{error?.stack}</pre>
                  {errorInfo?.componentStack && (
                    <div className="mt-2 text-slate-500">
                      <div className="font-bold text-slate-400">Component Stack:</div>
                      <pre className="whitespace-pre-wrap">{errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
