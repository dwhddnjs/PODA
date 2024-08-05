const Desc = ({
  content,
  className,
}: {
  content: string
  className: string
}) => {
  return <p className={`whitespace-pre-line text-xs ${className}`}>{content}</p>
}

export default Desc
