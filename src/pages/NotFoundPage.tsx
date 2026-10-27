import { Link } from "react-router"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-page flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-[96px] leading-none text-brand">404</p>
      <h1 className="text-[28px] font-bold">This page doesn't exist</h1>
      <Link to="/" className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 no-underline transition-colors">Back to home →</Link>
    </div>
  )
}

export default NotFoundPage
