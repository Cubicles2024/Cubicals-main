import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteCompanyDialog from './DeleteCompanyDialog'
import { format } from 'date-fns'

const CompaniesTable = ({ refreshCompanies }) => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);
    const [deleteDialogState, setDeleteDialogState] = useState({
        open: false,
        companyId: null
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        const filtered = companies.filter(company => 
            !searchCompanyByText || 
            company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        );
        setFilteredCompanies(filtered);
    }, [companies, searchCompanyByText]);
    
    return (
        <div className='rounded-lg border shadow-sm bg-white'>
            <Table className=''>
                <TableHeader className='bg-gray-50'>
                    <TableRow className='hover:bg-gray-50'>
                        <TableHead className='w-[60px]'>Logo</TableHead>
                        <TableHead className='min-w-[170px]'>Company Name</TableHead>
                        <TableHead className='min-w-[150px]'>Company Website</TableHead>
                        <TableHead className='min-w-[80px]'>Created Date</TableHead>
                        <TableHead className='text-right w-[100px]'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {filteredCompanies?.map((company) => (
                        <TableRow key={company._id} className='group hover:bg-gray-50 transition-colors'>
                            <TableCell>
                                <Avatar className='w-10 h-10 border-2 border-gray-100'>
                                    <AvatarImage 
                                        src={company.logo} 
                                        className='object-cover'
                                    />
                                    <AvatarFallback className='bg-gray-100 text-gray-600'>
                                        {company.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            
                            <TableCell className='font-medium text-gray-900'>
                                {company.name}
                            </TableCell>

                            <TableCell className='font-medium text-gray-900'>
                                {company?.website ? (
                                    <a 
                                        href={company.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        {company.website}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            
                            <TableCell className='text-gray-600'>
                                {format(new Date(company.createdAt), 'MMM dd, yyyy')}
                            </TableCell>
                            
                            <TableCell className='text-right'>
                                <Popover>
                                    <PopoverTrigger className='p-2 hover:bg-gray-100 rounded-full'>
                                        <MoreHorizontal className='w-5 h-5 text-gray-600' />
                                    </PopoverTrigger>
                                    
                                    <PopoverContent className='w-48 p-2 rounded-lg shadow-lg border border-gray-100'>
                                        <div className='space-y-2'>
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className='w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors'
                                            >
                                                <Edit2 className='w-4 h-4' />
                                                <span>Edit</span>
                                            </button>

                                            <button 
                                                onClick={() => navigate(`/admin/jobs`)}
                                                className='w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors'
                                            >
                                                <Eye className="h-4 w-4"/>
                                                <span>View Jobs</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => setDeleteDialogState({
                                                    open: true,
                                                    companyId: company._id
                                                })}
                                                className='w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors'
                                            >
                                                <Trash2 className='w-4 h-4' />
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
            
            {filteredCompanies.length === 0 && (
                <div className='p-8 text-center text-gray-500'>
                    No companies found matching your criteria
                </div>
            )}

            <DeleteCompanyDialog
                open={deleteDialogState.open}
                setOpen={() => setDeleteDialogState(prev => ({ ...prev, open: false }))}
                companyId={deleteDialogState.companyId}
                onDeleteSuccess={refreshCompanies}
            />
        </div>
    )
}

export default CompaniesTable