import { Service } from "./components/Service";

function App() {
  return (
    <div class="overflow-x-auto">
      <table class="table w-full table-compact">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Active</th>
            <th>Local Port</th>
            <th>Remote Port</th>
            <th>Remote Address</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <Service />
        </tbody>
      </table>
    </div>
  );
}

export default App;
