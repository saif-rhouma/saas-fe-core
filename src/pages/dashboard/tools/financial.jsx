export default function Page() {
  // const response = useQuery({
  //   queryKey: ['account-user'],
  //   queryFn: async () => {
  //     const { data } = await axios.get(endpoints.auth.me);
  //     return data;
  //   },
  // });

  // if (response.isPending || response.isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <AccountSettingView userAccount={response.data} /> */}
    </>
  );
}
