import SearchBar from '@/components/SearchBar';
import LocationList from '@/components/LocationList';

export default function Home() {
  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center">Погода в вашем городе</h1>
        <SearchBar />
        <LocationList />
      </div>
    </>
  );
}
