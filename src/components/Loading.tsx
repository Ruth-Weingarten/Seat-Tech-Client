interface LoadingProps{
   text?:string;
}

const Loading = ({text="Loading..."}:LoadingProps) => {
  return (
    <div>{text}</div>
  )
}

export default Loading