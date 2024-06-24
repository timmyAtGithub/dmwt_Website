import UpdateCaloriesChart from '../components/UpdateCaloriesChart';

const UpdateCaloriesPage = () => {
  const data = [
    { name: "Proteine", value: 150 },
    { name: "Kohlenhydrate", value: 300 },
    { name: "Fette", value: 100 }
  ];

  return <UpdateCaloriesChart data={data} />;
};

export default UpdateCaloriesPage;
