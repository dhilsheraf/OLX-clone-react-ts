import { useLocation } from "react-router"

const Details = () => {
  const location = useLocation()
  console.log(location)
  return (
  <>

    <div className="flex p-4 bg-[#f2f4f5] ">
        <img src={location?.state?.data?.image} alt="" />
        <div>
        <div className="border ml-10 bg-white mt-5 p-2">
        <h1 className="font-bold text-3xl ml-5">₹ {location?.state?.data?.price}</h1>
        <h1 className="mt-2 ml-5"><span className="font-semibold">Category</span> : {location?.state?.data?.category}</h1>
        <h1 className="mt-2 ml-5"><span className="font-semibold">Title</span> : {location?.state?.data?.title}</h1>
        </div>
        <div className="bg-white border mt-5 ml-10 p-5">
        <h1 className=""><span className="font-semibold">Description</span> : {location?.state?.data?.description}</h1>
        </div>
        </div>
    </div>
  </>)
}

export default Details
