import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { Place } from '../../types';
import { getPlace } from '../../api';
import Container from '../../componens/container';
import Loader from '../../componens/loader';
import Error from '../../componens/error';
import Buttons from './Buttons';
import Rating from '../../componens/card/Rating';
import Features from './Features';
import Status from '../../componens/card/Status';

const Detail = () => {
  const {id} = useParams();

  const {isLoading, error,data, refetch} = useQuery<Place>({
    queryKey: ["place"],
    queryFn: () => getPlace(id as string),
  })

  console.log(data)
  return (
    <Container designs='max-w-[700px]' >
          {
              isLoading ? (
              <Loader /> 
            ) :  error ? (
            <Error info={error.message} retry={refetch} /> 
            ):( 
               data && (
               <div>
                <Buttons />
               
                <div className='flex justify-between'>
                  <h1 className='text-3xl font-bold'>{data.name} </h1>
                  <Rating point={data.rating } expand />
                </div>
              
                <p>{data.description}</p>
                <img src={data.image_url} className=' rounded-lg'/>

                <Features arr={data.amenities} />

                <div className='flex justify-between gap-2 items-center
                mt-5'>

                  <p className='text-xl font-semibold'>
                    ${data.price_per_night}
                    <span className='text-sm text-gray-600'>/Gece
                    </span>
                  </p>
                  <Status availability={data.availability} expand/>

                </div>

               </div>
               )
          )}    
      </Container>
  )
}

export default Detail