import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Hero from '../components/hero'

class AuthorsIndex extends React.Component {
  render() {
    const authors = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h2 className="section-headline">Authors</h2>
            {authors.map(({ node }) => {
              return <Hero data={node} />
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default AuthorsIndex

export const pageQuery = graphql`
  query AuthorsQuery {
    allContentfulPerson {
      edges {
        node {
          email
          name
          title
          twitter
          shortBio {
            childMarkdownRemark {
              html
            }
            shortBio
          }
          image {
            fluid(maxWidth: 1180, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
