import { getJobs } from '@/api/apijobs'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect } from 'react'
import { BarLoader, HashLoader } from 'react-spinners'
import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import JobCard from '@/components/jobcard'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city'
import { FilterX, ArrowDownAZ, MapPin, Search } from 'lucide-react'

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);


  const { fn: fnCompanies, data: companies, } = useFetch(getCompanies);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query")
    if (query) setSearchQuery(query)
  }
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return <div>
    <h1 className='gradient gradient-title font-extrabold text-6x; sm:text-7xl text-center'>Latest Jobs</h1>

    {/* Add Filters */}
    <form onSubmit={handleSearch} className='h-14 flex w-full gap-4 items-center mb-3'>
      <Input
        type="text"
        placeholder="Search Jobs by Title..."
        name="search-query"
        className="h-full flex-1 px-4 text-md m-4"
      />
      <Button type="submit" className="h-full sm:w-28">
        Search
        <Search />
      </Button>
    </form>

    <div className='m-4 flex flex-col gap-5 sm:flex-row '>


      <Select value={location} onValueChange={(value) => setLocation(value)}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Filter Jobs by location" />
          <MapPin />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {State.getStatesOfCountry("IN").map(({ name }) => {
              return (<SelectItem key={name} value={name}>{name}</SelectItem>);
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={company_id}
        onValueChange={(value) => setCompany_id(value)}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Filter by Company" />
          <ArrowDownAZ />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies?.map(({ name, id }) => {
              return (
                <SelectItem key={name} value={id}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={clearFilters}>
        <FilterX />
        Clear Filters
      </Button>

    </div>

    {loadingJobs && <div className='fixed inset-0 flex items-center justify-center z-50'>
      <HashLoader color="#FF0000" />
    </div>}



    {loadingJobs === false && (
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobs?.length ? (
          jobs.map((job) => {
            return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
          })
        ) : (
          <div> No Jobs found 😓 </div>
        )}
      </div>
    )}

  </div>
}

export default JobListing
