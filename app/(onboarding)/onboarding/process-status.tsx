const ProcessStatus = ({ params }: { params: { process: string } }) => {
  const currentProcess = Number(params.process)
  const lightOn = <span className="rounded-lg w-2 h-2 bg-gray-200"></span>
  const lightOff = <span className="rounded-lg w-2 h-2 bg-gray-500"></span>

  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2">
      <div className=" mt-32 flex  gap-4">
        {currentProcess === 1 ? lightOn : lightOff}
        {currentProcess === 2 ? lightOn : lightOff}
        {currentProcess === 3 ? lightOn : lightOff}
      </div>
    </div>
  )
}

export default ProcessStatus
