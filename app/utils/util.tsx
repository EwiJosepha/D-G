"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { API_BASE_URL } from "../service/constant";

export function decodeBase64Url(token: string): any {
  const padding = '='.repeat((4 - (token.length % 4)) % 4);
  const base64 = (token + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const decoded = jwtDecode(base64);
  console.log(decoded);

  return decoded;
}

export let parsedId: any
// const [parseId, setParseId] = useState<number | undefined>(undefined)
if (typeof localStorage !== "undefined") {
  const agentCurrentId: { id?: number, email?: string, iat?: number, exp?: number } = JSON.parse(localStorage.getItem("decoded") as string);
  parsedId = agentCurrentId?.id
  console.log(parsedId);
}


export let uptPropId: any
if (typeof localStorage !== 'undefined') {
  uptPropId = localStorage.getItem('propId');
}
console.log("propertyId", uptPropId);

export const loginUrl = API_BASE_URL + "/auth/signin"

export const propertiesForAgent = API_BASE_URL + `/properties/agent/${parsedId}`

export const getAllProperties = API_BASE_URL + "/properties"

export const updateproperties = API_BASE_URL + `/properties/${uptPropId}`

export const searchByRoom = API_BASE_URL + `/properties/room/`

export const agentInfo = API_BASE_URL + `/api/v1/agent/${parsedId}`

export const logOutUrl = API_BASE_URL + "/auth/signout"

export const postUrl = API_BASE_URL + "/properties"
export const deleteProp = API_BASE_URL + `/properties/${uptPropId}`

//agentData
export const agentdata = () => {
  return useQuery({
    queryKey: ["agent-name"],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE_URL + `/api/v1/agent/${parsedId}`)
      return data
    }
  })
}

//get one property

export const getOneProperty = (params: number) => {
  return useQuery({
    queryKey: ['propertyOne'],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE_URL + `/properties/${params}`)
      return data
    }
  })
}
export const getsingleDashboardProp = () => {
  return useQuery({
    queryKey: ['propertyOne'],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE_URL + `/properties/${uptPropId}`)
      return data
    }
  })
}

//room search

export function searchRooms(searchParams: string) {
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE_URL + `/properties/room/${searchParams}`)
      return data
    }
  })

  return { data }


}

export function statusFilter(status: string) {
  return useQuery({
    queryKey: ["properties", status],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE_URL + `/properties?rentOrSale=${status}`)
      return data
    }
  })

}
