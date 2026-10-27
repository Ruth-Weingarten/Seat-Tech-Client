interface LoadingProps{
   text?:string;
}

const Loading = ({text="Loading..."}:LoadingProps) => {
  return (
    <div role="status" className="flex items-center gap-3 py-6 text-muted">
      <span className="size-5 rounded-full border-2 border-brand-soft border-t-brand animate-spin" aria-hidden="true"></span>
      {text}
    </div>
  )
}

export default Loading
