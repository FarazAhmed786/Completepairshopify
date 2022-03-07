
function Loader({loading}) {
  return (
    <div className={loading ? 'loader-wrapper active' : 'loader-wrapper'}>
        <div className="loader border-brand dark:border-white">
      <span className="loader-inner bg-brand dark:bg-white"></span>
    </div>
    </div>
  )
}

export default Loader