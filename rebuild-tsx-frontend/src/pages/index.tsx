//import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import Header from '../Components/Navbar/Header'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../Components/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Layout />
    </>
  )
}

export default Home
