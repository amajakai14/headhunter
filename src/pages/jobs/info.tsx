import { useRouter } from "next/router";
function InfoEmp() {
  const router = useRouter();
  const { id, name } = router.query;
  return (
    <div>
      Hello from Emp Info: {id} and {name}
    </div>
  );
}
export default InfoEmp;
