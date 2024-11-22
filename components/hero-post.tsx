import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  externalLink?: string
  writtenFor?: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  externalLink,
  writtenFor,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            {
              externalLink ? (
              <Link href={externalLink} passHref rel="noopener noreferrer" target="_blank">
                <a className="hover:underline flex items-center">
                  <style jsx>
                    {`
                      .external-post-link::after {
                        content: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>');
                        vertical-align: -0.2em;
                        padding-left: 0.1em;
                        width: 2rem;
                        display: inline-block;
                      }
                    `}
                  </style>
                  <span className="external-post-link">{title}</span>
                </a>
              </Link>
              ) :
              (
              <Link as={`/posts/${slug}`} href="/posts/[slug]">
                <a className="hover:underline flex items-center">
                <span className="truncate">{title}</span>
                </a>
              </Link>
              )
            }
            
          </h3>
          {
            writtenFor && (
              <p className="text-lg leading-relaxed mb-4 gray-500 italic">
                Written for <span className="font-bold">{writtenFor}</span>
              </p>
            )
          }
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}

export default HeroPost
