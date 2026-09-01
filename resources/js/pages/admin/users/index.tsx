import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    UserPlus,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    Shield,
    CheckCircle2,
    XCircle,
    Clock,
    Trash2,
    Edit3,
    User as UserIcon,
    ArrowRightCircle,
    Users as UsersIcon,
    Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from '@/components/ui/dialog';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import UserForm from './partials/user-form';
import UserDetails from './partials/user-details';

interface User {
    id: number;
    name: string;
    email: string;
    job_title: string | null;
    role: string;
    phone: string | null;
    status: string;
    avatar: string | null;
    last_login_at: string | null;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        links: any[];
        total: number;
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        role?: string;
        status?: string;
    };
    stats: {
        total: number;
        active: number;
        pending: number;
        admins: number;
    };
}

const roleColors: Record<string, string> = {
    admin: 'bg-red-50 text-red-600 border-red-100',
    manager: 'bg-blue-50 text-blue-600 border-blue-100',
    sales: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    technician: 'bg-purple-50 text-purple-600 border-purple-100',
    client: 'bg-amber-50 text-amber-600 border-amber-100',
};

const statusColors: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    suspended: 'bg-red-100 text-red-700',
    invited: 'bg-amber-100 text-amber-700',
    pending: 'bg-blue-100 text-blue-700 animate-pulse',
};

export default function UsersIndex({ users, filters, stats }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { ...filters, search }, { preserveState: true });
    };

    const deleteUser = (user: User) => {
        if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const toggleStatus = (user: User) => {
        router.post(route('admin.users.toggle-status', user.id));
    };

    const approveUser = (user: User) => {
        router.post(route('admin.users.approve', user.id));
    };

    return (
        <AdminLayout>
            <Head title="User Management - Admin CRM" />

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Team Management</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <UsersIcon className="w-4 h-4 text-primary" />
                        Managing {stats.total} team members across your organization.
                    </p>
                </div>
                <Button 
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-2xl h-12 px-8 bg-primary shadow-lg shadow-primary/20 gap-2 font-black transition-all hover:scale-105 active:scale-95"
                >
                    <UserPlus className="w-5 h-5" /> Add Team Member
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Members', value: stats.total, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50', filter: {} },
                    { label: 'Active Now', value: stats.active, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', filter: { status: 'active' } },
                    { label: 'Pending Approval', value: stats.pending, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', filter: { status: 'pending' }, highlight: stats.pending > 0 },
                    { label: 'Administrators', value: stats.admins, icon: Shield, color: 'text-red-600', bg: 'bg-red-50', filter: { role: 'admin' } },
                ].map((stat, i) => (
                    <div 
                        key={i} 
                        onClick={() => router.get(route('admin.users.index'), stat.filter)}
                        className={`bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 cursor-pointer hover:shadow-md transition-all ${stat.highlight ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <form onSubmit={handleSearch} className="flex-1 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or job title..."
                        className="w-full bg-white border border-slate-200 rounded-3xl h-14 pl-14 pr-6 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    />
                </form>
                
                <div className="flex gap-2">
                    <select 
                        value={filters.role || ''} 
                        onChange={e => router.get(route('admin.users.index'), { ...filters, role: e.target.value || null })}
                        className="bg-white border border-slate-200 rounded-2xl px-6 h-14 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none min-w-[140px]"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="sales">Sales</option>
                        <option value="technician">Technician</option>
                        <option value="client">Client (Medical)</option>
                    </select>

                    <select 
                        value={filters.status || ''} 
                        onChange={e => router.get(route('admin.users.index'), { ...filters, status: e.target.value || null })}
                        className="bg-white border border-slate-200 rounded-2xl px-6 h-14 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none appearance-none min-w-[140px]"
                    >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending Approval</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User Details</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Role & Title</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Last Activity</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.data.map((user) => (
                                <tr key={user.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                                    <td className="px-8 py-6" onClick={() => setSelectedUser(user)}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-lg group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-xl object-cover" /> : user.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{user.name}</span>
                                                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5" /> {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6" onClick={() => setSelectedUser(user)}>
                                        <div className="flex flex-col gap-1.5">
                                            <div className={`w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${roleColors[user.role]}`}>
                                                {user.role}
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                                <Briefcase className="w-3.5 h-3.5" /> {user.job_title || 'N/A'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6" onClick={() => setSelectedUser(user)}>
                                        <div className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColors[user.status]}`}>
                                            {user.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6" onClick={() => setSelectedUser(user)}>
                                        {user.last_login_at ? (
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-black">{new Date(user.last_login_at).toLocaleDateString()}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {new Date(user.last_login_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-bold text-slate-300 italic">Never logged in</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white transition-colors">
                                                    <MoreHorizontal className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 shadow-2xl w-52 p-2">
                                                <DropdownMenuItem onClick={() => setSelectedUser(user)} className="rounded-xl px-4 py-3 cursor-pointer gap-3 font-bold text-slate-700">
                                                    <ArrowRightCircle className="w-4 h-4" /> View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setEditingUser(user)} className="rounded-xl px-4 py-3 cursor-pointer gap-3 font-bold text-slate-700">
                                                    <Edit3 className="w-4 h-4" /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleStatus(user)} className={`rounded-xl px-4 py-3 cursor-pointer gap-3 font-bold ${user.status === 'active' ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                    {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                                    {user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                                                </DropdownMenuItem>
                                                {user.status === 'pending' && (
                                                    <DropdownMenuItem onClick={() => approveUser(user)} className="rounded-xl px-4 py-3 cursor-pointer gap-3 font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100">
                                                        <CheckCircle2 className="w-4 h-4" /> Approve & Activate
                                                    </DropdownMenuItem>
                                                )}
                                                <div className="my-1 border-t border-slate-100" />
                                                <DropdownMenuItem onClick={() => deleteUser(user)} className="rounded-xl px-4 py-3 cursor-pointer gap-3 font-bold text-destructive hover:bg-destructive/5">
                                                    <Trash2 className="w-4 h-4" /> Delete Member
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-4xl rounded-[3rem] p-8 lg:p-12 max-h-[90vh] overflow-y-auto border-none shadow-2xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Add Team Member</DialogTitle>
                        <DialogDescription className="text-lg font-medium text-slate-400">Onboard a new member to the Terma Medical team.</DialogDescription>
                    </DialogHeader>
                    <UserForm onSuccess={() => setIsCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
                <DialogContent className="max-w-4xl rounded-[3rem] p-8 lg:p-12 max-h-[90vh] overflow-y-auto border-none shadow-2xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Edit Member Profile</DialogTitle>
                        <DialogDescription className="text-lg font-medium text-slate-400">Update account details and permissions for {editingUser?.name}.</DialogDescription>
                    </DialogHeader>
                    {editingUser && <UserForm user={editingUser} onSuccess={() => setEditingUser(null)} />}
                </DialogContent>
            </Dialog>

            {/* Details Slide-over/Dialog */}
            {selectedUser && (
                <UserDetails 
                    user={selectedUser} 
                    onClose={() => setSelectedUser(null)} 
                    onEdit={() => {
                        setEditingUser(selectedUser);
                        setSelectedUser(null);
                    }}
                />
            )}
        </AdminLayout>
    );
}
