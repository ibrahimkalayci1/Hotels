import { useQuery } from "@tanstack/react-query"
import { getPlaces } from "../../api"
import { Place } from "../../types"
import Loader from "../../componens/loader"
import Error from "../../componens/error"
import Card from "../../componens/card"
import { useSearchParams } from "react-router-dom"

const List = () => {
const [params] = useSearchParams()
const paramsObj = Object.fromEntries(params.entries())
//bütün değerleri objeye cevirir
  const {isLoading, error, data, refetch} = useQuery<Place[]>({
    queryKey:["places",paramsObj],
    queryFn: () =>  getPlaces(paramsObj),
  })

  return (
    <div className=" mt-10">
      <h1 className="font-bold text-2xl">Yakınınızdaki 
        Lokasyonlar</h1>

        <div>
          {isLoading ? (
            <Loader/>
          ): error ? (
            <Error info={error.message} retry= {refetch} />
          ) : (
            <div className="grid gap-5 mt-5">
              {data?.map((place) => (
           <Card place={place} key={place.id} />               ))}
            </div>
          )}
        </div>
      </div>
  )
}

export default List