import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { OrderStatusView } from 'src/sections/kanban/view/order-status-view';
// ----------------------------------------------------------------------
const columns = [
  {
    id: '1-column-in-progress',
    name: 'In progress',
  },
  {
    id: '2-column-ready-to-deliver',
    name: 'Ready to Deliver',
  },
  {
    id: '3-column-delivered',
    name: 'Delivered',
  },
];

const datares = {
  board: {
    tasks: {
      '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': [
        {
          id: '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          due: ['2024-09-07T10:23:14+00:00', '2024-09-08T10:23:14+00:00'],
          status: 'To do',
          labels: [],
          comments: [],
          assignee: [],
          priority: 'low',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Prepare Monthly Financial Report',
          description:
            'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
        },
        {
          id: '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          due: ['2024-09-08T10:23:14+00:00', '2024-09-09T10:23:14+00:00'],
          status: 'To do',
          labels: ['Technology'],
          comments: [
            {
              id: 'afac6e45-1b41-4e2d-b8da-42213cc46934',
              name: 'Jayvion Simon',
              createdAt: '2024-09-06T10:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
          ],
          priority: 'hight',
          attachments: [
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-12.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-13.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-14.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-15.webp',
          ],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Design New Marketing Campaign',
          description:
            'Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.',
        },
        {
          id: '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          due: ['2024-09-09T10:23:14+00:00', '2024-09-10T10:23:14+00:00'],
          status: 'To do',
          labels: ['Technology', 'Health and Wellness'],
          comments: [
            {
              id: 'afac6e45-1b41-4e2d-b8da-42213cc46934',
              name: 'Jayvion Simon',
              createdAt: '2024-09-06T10:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: '4dad999f-b96a-486a-9a50-f968fa3cc532',
              name: 'Lucian Obrien',
              createdAt: '2024-09-05T09:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
          ],
          priority: 'medium',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Analyze Customer Feedback',
          description:
            'Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.',
        },
      ],
      '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': [
        {
          id: '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          due: ['2024-09-10T10:23:14+00:00', '2024-09-11T10:23:14+00:00'],
          status: 'In progress',
          labels: ['Technology', 'Health and Wellness', 'Travel'],
          comments: [
            {
              id: 'afac6e45-1b41-4e2d-b8da-42213cc46934',
              name: 'Jayvion Simon',
              createdAt: '2024-09-06T10:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: '4dad999f-b96a-486a-9a50-f968fa3cc532',
              name: 'Lucian Obrien',
              createdAt: '2024-09-05T09:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
            {
              id: '5fd064f0-2a6f-4f99-92bc-9d272c4c6a7e',
              name: 'Deja Brady',
              createdAt: '2024-09-04T08:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              name: 'Deja Brady',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
            },
          ],
          priority: 'hight',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Update Website Content',
          description:
            'Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.',
        },
        {
          id: '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          due: ['2024-09-11T10:23:14+00:00', '2024-09-12T10:23:14+00:00'],
          status: 'In progress',
          labels: ['Technology', 'Health and Wellness', 'Travel', 'Finance'],
          comments: [
            {
              id: 'afac6e45-1b41-4e2d-b8da-42213cc46934',
              name: 'Jayvion Simon',
              createdAt: '2024-09-06T10:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: '4dad999f-b96a-486a-9a50-f968fa3cc532',
              name: 'Lucian Obrien',
              createdAt: '2024-09-05T09:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
            {
              id: '5fd064f0-2a6f-4f99-92bc-9d272c4c6a7e',
              name: 'Deja Brady',
              createdAt: '2024-09-04T08:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            },
            {
              id: '77cee5ae-f41c-4b03-b31a-ffbb4c26e619',
              name: 'Harrison Stein',
              createdAt: '2024-09-03T07:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
              messageType: 'text',
              message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              name: 'Deja Brady',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
              name: 'Harrison Stein',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
            },
          ],
          priority: 'medium',
          attachments: [],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Conduct Market Research',
          description:
            'Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.',
        },
      ],
      '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': [],
      '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4': [
        {
          id: '6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
          due: ['2024-09-12T10:23:14+00:00', '2024-09-13T10:23:14+00:00'],
          status: 'Done',
          labels: ['Technology', 'Health and Wellness', 'Travel', 'Finance', 'Education'],
          comments: [
            {
              id: 'afac6e45-1b41-4e2d-b8da-42213cc46934',
              name: 'Jayvion Simon',
              createdAt: '2024-09-06T10:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
              messageType: 'text',
              message:
                'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
            },
            {
              id: '4dad999f-b96a-486a-9a50-f968fa3cc532',
              name: 'Lucian Obrien',
              createdAt: '2024-09-05T09:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            },
            {
              id: '5fd064f0-2a6f-4f99-92bc-9d272c4c6a7e',
              name: 'Deja Brady',
              createdAt: '2024-09-04T08:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
              messageType: 'image',
              message: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            },
            {
              id: '77cee5ae-f41c-4b03-b31a-ffbb4c26e619',
              name: 'Harrison Stein',
              createdAt: '2024-09-03T07:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
              messageType: 'text',
              message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            },
            {
              id: '7ee7d22e-e1d9-48c2-8350-8f2b0b43f8f4',
              name: 'Reece Chung',
              createdAt: '2024-09-02T06:23:14+00:00',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-5.webp',
              messageType: 'text',
              message:
                'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
            },
          ],
          assignee: [
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              name: 'Jayvion Simon',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-1.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              name: 'Lucian Obrien',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-2.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              name: 'Deja Brady',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-3.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
              name: 'Harrison Stein',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-4.webp',
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
              name: 'Reece Chung',
              avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-5.webp',
            },
          ],
          priority: 'low',
          attachments: [
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-5.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-6.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-7.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-8.webp',
            'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-9.webp',
          ],
          reporter: {
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
            name: 'Angelique Morse',
            avatarUrl: 'https://api-dev-minimal-v6.vercel.app/assets/images/avatar/avatar-17.webp',
          },
          name: 'Develop Software Application',
          description:
            'Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.',
        },
      ],
    },
    columns: [
      {
        id: '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        name: 'To do',
      },
      {
        id: '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        name: 'In progress',
      },
      {
        id: '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        name: 'Ready to test',
      },
      {
        id: '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        name: 'Done',
      },
    ],
  },
};

/** *************************** */
const metadata = { title: `Order Status | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.order.list);
      return data;
    },
  });

  // const responseAnalytics = useQuery({
  //   queryKey: ['orders', 'analytics'],
  //   queryFn: async () => {
  //     const { data } = await axios.get(endpoints.order.analytics);
  //     return data;
  //   },
  // });

  if (response.isPending || response.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderStatusView
        boardData={datares.board}
        boardEmpty={false}
        boardLoading={false}
        columns={columns}
      />
    </>
  );
}
