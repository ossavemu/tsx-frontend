//import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import Header from '../Components/Navbar/Header'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../Components/Layout'
import Dashboard from '../Components/Dashboard'

const Home: NextPage = () => {
  return (
    <>
      <Layout />
      <Dashboard />
    </>
  )
}

export default Home
