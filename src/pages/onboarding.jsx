import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === 'recruiter' ? "/post-job" : "/jobs")
      })
      .catch((err) => {
        console.error("Error in updating role : ", err);
      });
  }

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === 'recruiter' ? "/post-job" : "/jobs"
      )
    }
  })


  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return <div className='flex flex-col items-center justify-center mt-40'>
    <h2 className='gradient gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'> I am a...</h2>

    <div className='mt-12 flex gap-6 justify-center'>

      <Button size='xl' onClick={() => handleRoleSelection('candidate')} >
        Candidate
      </Button>

      <Button size='xl' variant="destructive" onClick={() => handleRoleSelection('recruiter')}>
        Recruiter
      </Button>
    </div>
  </div>
}

export default OnBoarding
