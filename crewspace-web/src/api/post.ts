import axios from 'axios';

export const getPostData = async (id: number) => {
  const { data } = await axios({
    url: 'https://crew-server.o-r.kr/v1/posts/community/76',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${process.env.DUMMY_TOKEN}`,
      'Space-id': '1',
    },
  });

  return data;
};
