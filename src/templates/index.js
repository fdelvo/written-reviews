import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import FeaturePost from '../components/featurePost'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import Pagination from '../components/pagination'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const featurePost = get(this, 'props.data.allContentfulBlogPost.edges[0]')
    const { currentPage, numPagesPosts } = get(this, 'props.pageContext')
    const isFirst = currentPage === 1
    const isLast = currentPage === numPagesPosts
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <FeaturePost data={featurePost.node} />
          <div className="wrapper">
            <h2 className="section-headline">Posts</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
            <Pagination
              isFirst={isFirst}
              isLast={isLast}
              prevPage={prevPage}
              nextPage={nextPage}
              numPages={numPagesPosts}
              to={"/"}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          slug
          author {
            name
          }
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          thumbnail: heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          coverImage: heroImage {
            fluid(maxWidth: 1180, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
