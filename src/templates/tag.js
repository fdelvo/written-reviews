import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import get from 'lodash/get'
import ArticlePreview from '../components/article-preview'
import FeaturePost from '../components/featurePost'
import Pagination from '../components/pagination'

class TagTemplate extends React.Component {
  render() {
    const { tag, currentPage, numPagesPostsTags } = get(
      this.props,
      'pageContext'
    )
    const { edges, totalCount } = get(this.props, 'data.allContentfulBlogPost')
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${tag}":`
    const featurePost = get(this, 'props.data.allContentfulBlogPost.edges[0]')
    const isFirst = currentPage === 1
    const isLast = currentPage === numPagesPostsTags
    const prevPage =
      currentPage - 1 === 1
        ? `/tags/${tag}/`
        : `/tags/${tag}/${(currentPage - 1).toString()}`
    const nextPage = `/tags/${tag}/${(currentPage + 1).toString()}`

    return (
      <Layout>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <p>{tagHeader}</p>
            {edges.length == 1 && <FeaturePost data={featurePost.node} />}
            {edges.length > 1 && (
              <ul className="article-list">
                {edges.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            )}
            <Pagination
              isFirst={isFirst}
              isLast={isLast}
              nextPage={nextPage}
              prevPage={prevPage}
              numPages={numPagesPostsTags}
              to={`/tags/${tag}/`}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String, $skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      limit: $limit
      skip: $skip
      sort: { fields: [publishDate], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          slug
          title
          author {
            name
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          tags
          publishDate(formatString: "MMMM Do, YYYY")
          thumbnail: heroImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
