interface SubmitButtonProps
{
    text:string,
    submit_text:string,
    isSending:boolean

}

const SubmitButton = ({text,submit_text,isSending}:SubmitButtonProps) => {
  return (
     <button type="submit" style={{ padding: "10px 20px" }} disabled={isSending}>
          {isSending ?  submit_text: text}
        </button>
  )
}

export default SubmitButton