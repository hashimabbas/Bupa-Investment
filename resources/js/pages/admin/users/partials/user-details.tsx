import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
    X, 
    Mail, 
    Phone, 
    Briefcase, 
    Shield, 
    Clock, 
    Calendar,
    Edit3,
    ArrowRightCircle,
    User as UserIcon,
    Building2,
    Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
    job_title: string | null;
    role: string;
    phone: string | null;
    status: string;
    avatar: string | null;
    bio: string | null;
    last_login_at: string | null;
    created_at: string;
}

interface Props {
    user: User;
    onClose: () => void;
    onEdit: () => void;
}

const roleColors: Record<string, string> = {
    admin: 'bg-red-50 text-red-600 border-red-100',
    manager: 'bg-blue-50 text-blue-600 border-blue-100',
    sales: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    technician: 'bg-purple-50 text-purple-600 border-purple-100',
};

export default function UserDetails({ user, onClose, onEdit }: Props) {
    return (
        <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] animate-in fade-in duration-300" />
                <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-500 border-l border-slate-100">
                    
                    {/* Header */}
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${roleColors[user.role]}`}>
                                {user.role} Role
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {user.status}
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white transition-colors" onClick={onClose}>
                                <X className="w-5 h-5" />
                            </Button>
                        </Dialog.Close>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                        <div className="flex flex-col gap-12">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center text-center gap-6">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 flex items-center justify-center text-slate-400 font-black text-4xl shadow-xl border-4 border-white">
                                        {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-[2.5rem] object-cover" /> : user.name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h3>
                                    <span className="text-lg font-bold text-slate-400 flex items-center justify-center gap-2">
                                        <Briefcase className="w-5 h-5 text-primary" /> {user.job_title || 'No Title Set'}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Button onClick={onEdit} variant="outline" className="rounded-2xl gap-2 h-12 px-6 font-bold border-slate-200">
                                        <Edit3 className="w-4 h-4" /> Edit Profile
                                    </Button>
                                    <Button variant="outline" className="rounded-2xl gap-2 h-12 px-6 font-bold border-slate-200">
                                        <Activity className="w-4 h-4" /> Activity Log
                                    </Button>
                                </div>
                            </div>

                            {/* Contact Grid */}
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col gap-2 group">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-sm font-black text-slate-900">{user.email}</span>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col gap-2 group">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <span className="text-sm font-black text-slate-900">{user.phone || 'Not available'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="flex flex-col gap-4 p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Member Bio</h4>
                                <p className="text-sm leading-relaxed font-medium opacity-90">
                                    {user.bio || "No professional biography has been provided for this team member yet. Update the profile to add a summary of expertise and roles."}
                                </p>
                                <div className="absolute -bottom-10 -right-10 opacity-10">
                                    <Building2 className="w-40 h-40" />
                                </div>
                            </div>

                            {/* Timeline Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col gap-2 group">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Login</span>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs font-black text-slate-900">
                                            {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col gap-2 group">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Joined On</span>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs font-black text-slate-900">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-slate-100 bg-white">
                         <Button className="w-full h-14 rounded-2xl bg-slate-900 font-black gap-2 group shadow-xl shadow-slate-900/10">
                            Reset Security Credentials
                            <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                         </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
