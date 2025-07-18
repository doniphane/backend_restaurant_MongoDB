import { useState } from 'react';
import toast from 'react-hot-toast';

function AuthConfig({ onTokenSet }) {
    const [token, setToken] = useState(localStorage.getItem('api_token') || '');
    const [showAuth, setShowAuth] = useState(false);

    const handleSaveToken = () => {
        if (token.trim()) {
            localStorage.setItem('api_token', token.trim());
            onTokenSet(token.trim());
            toast.success('Token API sauvegardé !');
            setShowAuth(false);
        } else {
            localStorage.removeItem('api_token');
            onTokenSet('');
            toast.success('Token supprimé');
            setShowAuth(false);
        }
    };

    const handleSkipAuth = () => {
        localStorage.removeItem('api_token');
        onTokenSet('');
        toast.info('Mode sans authentification');
        setShowAuth(false);
    };

    if (!showAuth) {
        return (
            <div className="fixed top-4 left-4 z-50">
                <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setShowAuth(true)}
                >
                    🔑 Auth API
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
                <div className="card-body">
                    <h2 className="card-title">Configuration API Platform</h2>
                    <p className="text-sm opacity-70">
                        Si votre API nécessite une authentification, entrez votre token :
                    </p>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Token API (optionnel)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Bearer token ou API key"
                            className="input input-bordered"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>

                    <div className="card-actions justify-end gap-2">
                        <button
                            className="btn btn-ghost"
                            onClick={handleSkipAuth}
                        >
                            Sans auth
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSaveToken}
                        >
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthConfig; 