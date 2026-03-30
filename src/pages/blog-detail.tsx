import { useParams } from 'react-router-dom';

import { _posts } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { BlogDetailView } from 'src/sections/blog/view/blog-detail-view';

// ----------------------------------------------------------------------

export default function Page() {
  const { id, property } = useParams<{ id: string; property: string }>();

  const post = _posts.find((p) => p.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <title>{`${post.title} - ${property} - ${CONFIG.appName}`}</title>

      <BlogDetailView post={post} property={property || ''} />
    </>
  );
}
