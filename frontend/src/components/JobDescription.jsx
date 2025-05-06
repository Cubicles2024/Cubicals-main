import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react'; // Using Lucide icon instead of image
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const { id: jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        if (!user){
            navigate('/login');
            return;
        }
        
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);
                const updatedJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Application failed');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const token = user?.token;
        
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true
                    }
                );
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(app => 
                        app.applicant === user?._id
                    ));
                }
            } catch (error) {
                toast.error('Failed to load job details');
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
        <Navbar/>
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="gap-2 px-0 hover:bg-transparent"
                >
                    <ArrowLeft className="h-5 w-5 text-primary" />
                    <span className="text-lg font-medium">Back to Jobs</span>
                </Button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {singleJob?.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-primary">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge variant="outline" className="text-emerald-600">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge variant="outline" className="text-purple-600">
                                ₹{singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied}
                        className={`w-full md:w-auto text-lg px-8 py-6 rounded-xl transition-all ${
                            isApplied 
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : 'bg-purple-700 hover:bg-purple-700/90 text-white shadow-lg hover:shadow-primary/40'
                        }`}
                    >
                        {isApplied ? 'Application Submitted' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            {/* Job Details */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">
                    Job Details
                </h2>
                
                <div className="grid bg-gray-50 p-2 rounded-sm grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                    <DetailItem  label="Location" value={singleJob?.location} />
                    <DetailItem label="Experience" value={`${singleJob?.experience? singleJob.experience + 'years' : 'Not mentioned'} `} />
                    <DetailItem label="Posted Date" 
                        value={new Date(singleJob?.createdAt).toLocaleDateString()} />
                    <DetailItem label="Total Applicants" 
                        value={singleJob?.applications?.length} />
                </div>
            </div>

            {/* Job Description */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">
                    Description
                </h2>
                <p className="text-gray-950 leading-relaxed">
                    {singleJob?.description}
                </p>
            </div>

            { /*Job Requirements*/ }
            <div className='space-y-6'>
                <h2 className='text-2xl font-semibold border-b pb-2'>Job Requirements</h2>
                <p className="text-gray-950 leading-relaxed">
                    {singleJob?.requirements}
                </p>
            </div>
        </div>
        <Footer/>
        </>
    );
};

// Reusable detail component
const DetailItem = ({ label, value }) => (
    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
        <span className="font-medium">{label}</span>
        <span className="text-foreground">{value}</span>
    </div>
);

export default JobDescription;