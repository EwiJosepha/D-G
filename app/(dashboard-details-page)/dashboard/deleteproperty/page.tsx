import React, { use } from 'react'
import { uptPropId } from '@/app/utils/util'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


function DeleteProperty() {
  // const { data } = useQuery({
  //   queryKey: ["delete"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(`http://localhost:4000/properties/${uptPropId}`)
  //   }
  // })

  function deleteProperty() {

    const reqbody = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(uptPropId, reqbody).then((res) => {
      if (!res.ok) {
        throw new Error("failed to delete")

      }
      return res.json()
    }).then((data) => {
      if (data.status === 200) {
        console.log("delete succeeded");
      }
    }).catch((err) => {
      console.log(err);

    })

  }
  return (
    <div>
      <h1>Are you sure you want to delete this Property?

        <button type='submit' onSubmit={deleteProperty}>Click here to Delete</button>
      </h1>
    </div>
  )
}

export default DeleteProperty
