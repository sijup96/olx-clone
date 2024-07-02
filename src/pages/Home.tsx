import Header from '../components/Header'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Navebar from '../components/Navebar'

const Home = () => {
  return (
    <div>
      <Header />
      <Navebar />
      <Banner />
      <Products />
      <Footer />
    </div>
  )
}

export default Home
