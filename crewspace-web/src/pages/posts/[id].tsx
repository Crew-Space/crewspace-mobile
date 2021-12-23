import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getPostData } from '@/api/post';

const Post = ({ id }: { id: number }) => {
  const { data } = useQuery('posts', () => getPostData(id));

  return (
    <div>
      ??
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: '76',
        },
      },
      {
        params: {
          id: '75',
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('posts', () => getPostData(params.id));

  return {
    props: {
      id: params.id,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
