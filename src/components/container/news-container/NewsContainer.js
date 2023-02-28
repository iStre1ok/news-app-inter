import {ButtonAll, ButtonCol} from '@/components/ui/button/ButtonAll'
import {getAllData} from '@/services/fetchData'
import {useMediaQuery} from '@mui/material'
import {useState, useEffect} from 'react'
import FilterAllTabs from '../../filter/filter-all-tabs/FilterAllTabs'
import Heading from '../../heading/Heading'
import AllPosts from '../../posts/all-posts/AllPosts'

import styles from './news-container.module.scss'

const NewsContainer = () => {
  const [posts, setPosts] = useState([])
  const [countPosts, setCountPosts] = useState(8)
  const [selectedFilters, setSelectedFilters] = useState([])

  useEffect(() => {
    getAllData().then(res => setPosts(res))
  }, [])

  const mobile = useMediaQuery('(max-width:768px)')

  const getMainListNews = post => {
    return post.slice(0, countPosts)
  }

  //тогл постов из фильтра или всех
  const filteredPosts =
    selectedFilters.length !== 0
      ? posts.filter(post => selectedFilters.includes(post.application))
      : posts

  return (
    <div className={styles.wrapper}>
      <Heading countPosts={countPosts} />
      <FilterAllTabs
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <AllPosts posts={filteredPosts} getMainListNews={getMainListNews} />

      {posts.length >= 8 &&
        (countPosts >= posts.length ? (
          <ButtonCol setCountPosts={setCountPosts} />
        ) : (
          <ButtonAll
            mobile={mobile}
            setCountPosts={setCountPosts}
            posts={posts}
          />
        ))}
    </div>
  )
}

export default NewsContainer
