import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import FeaturePost from '../components/featurePost'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const featurePost = get(this, 'props.data.allContentfulBlogPost.edges[0]')

    return (
      <Layout location={this.props.location} >
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
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }, limit: 10) {
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
