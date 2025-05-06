import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter(job => {
            if (!searchJobByText) return true
            const search = searchJobByText.toLowerCase()
            return (
                job?.title?.toLowerCase().includes(search) ||
                job?.company?.name.toLowerCase().includes(search)
            )
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const handleDeleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
    
        try {
            const res = await fetch(`${JOB_API_END_POINT}/delete/${jobId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete job.");
            }
    
            // Optionally show a toast or message
            // alert("Job deleted successfully.");
            toast.success("Job deleted successfully!")

            setFilterJobs(prev => prev.filter(job => job._id !== jobId));
        } catch (error) {
            console.error("Failed to delete job:", error);
            alert(error.message || "Error deleting job.");
        }
    };
    
    

    return (
        <div className="rounded-lg border shadow-sm bg-white">
            <Table className="min-w-[800px]">
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                        <TableHead className="w-[200px]">Company</TableHead>
                        <TableHead className="min-w-[250px]">Role</TableHead>
                        <TableHead className="w-[150px]">Posted Date</TableHead>
                        <TableHead className="text-right w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow 
                            key={job._id}
                            className="group hover:bg-gray-50 transition-colors"
                        >
                            <TableCell className="font-medium text-gray-900">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarImage src={job.company?.logo} />
                                        <AvatarFallback className="bg-gray-100">
                                            {job.company?.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    {job.company?.name}
                                </div>
                            </TableCell>
                            
                            <TableCell className="text-gray-900 font-medium">
                                {job.title}
                            </TableCell>
                            
                            <TableCell className="text-gray-600">
                                {formatDate(job.createdAt)}
                            </TableCell>
                            
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-full">
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </PopoverTrigger>
                                    
                                    <PopoverContent 
                                        className="w-48 p-2 rounded-lg shadow-lg border border-gray-100"
                                        align="end"
                                    >
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Applicants</span>
                                            </button>

                                            <button
                                                onClick={() => handleDeleteJob(job._id)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {filterJobs.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    {searchJobByText ? 
                        "No jobs found matching your search" : 
                        "No jobs posted yet"
                    }
                </div>
            )}
        </div>
    )
}

export default AdminJobsTable