import { useLocation, Navigate } from 'react-router-dom';

interface LocationState {
  email?: string;
}

const VerifyEmail = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.email) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <div className="mt-4 text-center text-gray-600">
            <p>We've sent a verification link to:</p>
            <p className="font-medium mt-2">{state.email}</p>
            <p className="mt-4">
              Click the link in the email to verify your account and complete the registration process.
            </p>
          </div>
          <div className="mt-8 text-sm text-center">
            <p>Didn't receive the email?</p>
            <p className="mt-2">
              Check your spam folder or{' '}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                try registering again
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;