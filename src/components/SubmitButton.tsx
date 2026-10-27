interface SubmitButtonProps
{
    text:string,
    submit_text:string,
    isSending:boolean

}

const SubmitButton = ({text,submit_text,isSending}:SubmitButtonProps) => {
  return (
     <button type="submit" className="flex-1 bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-bold text-[17px] px-5 py-[14px] cursor-pointer transition-colors" disabled={isSending}>
          {isSending ?  submit_text: text}
        </button>
  )
}

export default SubmitButton
