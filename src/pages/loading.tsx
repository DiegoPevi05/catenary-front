import LoaderVane from "../components/loaders/VaneLoader"

const LoadingPage = () => {
  return(
    <div className="w-full h-screen bg-white flex items-center justify-center text-primary">
        <LoaderVane className="h-auto w-96"/>
    </div>
  )
}

export default LoadingPage;
