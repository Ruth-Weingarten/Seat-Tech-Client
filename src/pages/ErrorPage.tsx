import { Link } from "react-router"

const ErrorPage = () => {

  return (
    <div className="min-h-screen bg-page flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-[64px] leading-none uppercase text-brand">Oops.</p>
      <h1 className="text-[28px] font-bold">Something went wrong</h1>
      <p className="text-muted">Try again, or go back to the home page.</p>
      <Link to="/" className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 no-underline transition-colors">Back to home →</Link>
    </div>
  )
}

export default ErrorPage
