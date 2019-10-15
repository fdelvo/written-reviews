import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'

class TagsIndex extends React.Component {
  render() {
    const tags = get(this, 'props.data.allContentfulBlogPost.group')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <ul class="tag-list">
              {tags.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${tag.fieldValue}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default TagsIndex

export const pageQuery = graphql`
  query TagsQuery {
    allContentfulBlogPost {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`
