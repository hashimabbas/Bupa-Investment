import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    Loader2, 
    User as UserIcon, 
    Mail, 
    Lock, 
    Briefcase, 
    Phone, 
    Shield, 
    Activity
} from 'lucide-react';

interface Permission {
    id: number;
    name: string;
    module: string;
    description: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    job_title: string | null;
    role: string;
    phone: string | null;
    status: string;
    bio: string | null;
    permissions?: Permission[];
}

interface Props {
    user?: User;
    onSuccess?: () => void;
}

export default function UserForm({ user, onSuccess }: Props) {
    const { props } = usePage();
    const allPermissions = props.permissions as Record<string, Permission[]>;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        job_title: user?.job_title || '',
        role: user?.role || 'sales',
        phone: user?.phone || '',
        status: user?.status || 'active',
        bio: user?.bio || '',
        permissions: user?.permissions?.map(p => p.id) || [] as number[],
    });

    const togglePermission = (id: number) => {
        const current = [...data.permissions];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setData('permissions', current);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            put(route('admin.users.update', user.id), {
                onSuccess: () => onSuccess?.(),
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-12">
            {/* Section: Personal Information */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</Label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                placeholder="e.g. John Doe"
                                className="pl-12 rounded-2xl h-12 border-slate-200"
                                required
                            />
                        </div>
                        {errors.name && <p className="text-destructive text-xs font-bold">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                type="email"
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)} 
                                placeholder="john@terma.com"
                                className="pl-12 rounded-2xl h-12 border-slate-200"
                                required
                            />
                        </div>
                        {errors.email && <p className="text-destructive text-xs font-bold">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Job Title</Label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                value={data.job_title} 
                                onChange={e => setData('job_title', e.target.value)} 
                                placeholder="e.g. Sales Manager"
                                className="pl-12 rounded-2xl h-12 border-slate-200"
                            />
                        </div>
                        {errors.job_title && <p className="text-destructive text-xs font-bold">{errors.job_title}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                value={data.phone} 
                                onChange={e => setData('phone', e.target.value)} 
                                placeholder="+249..."
                                className="pl-12 rounded-2xl h-12 border-slate-200"
                            />
                        </div>
                        {errors.phone && <p className="text-destructive text-xs font-bold">{errors.phone}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Short Bio / Professional Summary</Label>
                    <Textarea 
                        value={data.bio} 
                        onChange={e => setData('bio', e.target.value)} 
                        placeholder="Briefly describe the team member's role and expertise..."
                        className="rounded-3xl min-h-[100px] border-slate-200 p-6 resize-none"
                    />
                    {errors.bio && <p className="text-destructive text-xs font-bold">{errors.bio}</p>}
                </div>
            </div>

            {/* Section: System Access & Security */}
            <div className="space-y-6 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">System Access & Security</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Role</Label>
                        <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <select 
                                value={data.role} 
                                onChange={e => setData('role', e.target.value)} 
                                className="w-full pl-12 pr-4 h-12 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/5 text-sm font-bold outline-none appearance-none bg-white shadow-sm"
                            >
                                <option value="admin">Administrator (Full Access)</option>
                                <option value="manager">Manager</option>
                                <option value="sales">Sales Representative</option>
                                <option value="technician">Field Technician</option>
                            </select>
                        </div>
                        {errors.role && <p className="text-destructive text-xs font-bold">{errors.role}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Status</Label>
                        <div className="relative">
                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <select 
                                value={data.status} 
                                onChange={e => setData('status', e.target.value)} 
                                className="w-full pl-12 pr-4 h-12 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-primary/5 text-sm font-bold outline-none appearance-none bg-white shadow-sm"
                            >
                                <option value="active">Active Access</option>
                                <option value="suspended">Suspended</option>
                                <option value="invited">Invitation Pending</option>
                            </select>
                        </div>
                        {errors.status && <p className="text-destructive text-xs font-bold">{errors.status}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Password {user && '(Leave blank to keep current)'}</Label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                            type="password"
                            value={data.password} 
                            onChange={e => setData('password', e.target.value)} 
                            placeholder={user ? "••••••••" : "Minimum 8 characters"}
                            className="pl-12 rounded-2xl h-12 border-slate-200 shadow-sm"
                            required={!user}
                        />
                    </div>
                    {errors.password && <p className="text-destructive text-xs font-bold">{errors.password}</p>}
                </div>

                {/* Permission Matrix */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Granular Module Permissions</Label>
                        {data.role === 'admin' && (
                            <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 animate-pulse">
                                Full System Access Override
                            </span>
                        )}
                    </div>
                    
                    <div className={`bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 transition-all duration-500 ${data.role === 'admin' ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100">
                                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Module / Feature</th>
                                        <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">View</th>
                                        <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Create</th>
                                        <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Edit</th>
                                        <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {Object.entries(allPermissions).map(([module, perms]) => (
                                        <tr key={module} className="group hover:bg-primary/[0.02] transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-700 capitalize group-hover:text-primary transition-colors">
                                                        {module.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Module Access</span>
                                                </div>
                                            </td>
                                            {['view', 'create', 'edit', 'delete'].map(action => {
                                                const perm = perms.find(p => p.name.endsWith(`.${action}`));
                                                return (
                                                    <td key={action} className="px-6 py-5 text-center">
                                                        {perm ? (
                                                            <div className="flex justify-center">
                                                                <Checkbox 
                                                                    checked={data.permissions.includes(perm.id)}
                                                                    onCheckedChange={() => togglePermission(perm.id)}
                                                                    className="rounded-lg w-6 h-6 border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-300 hover:scale-110 active:scale-95"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] text-slate-200 font-bold">N/A</span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {data.role !== 'admin' && (
                        <p className="text-[10px] font-bold text-slate-400 italic px-2">
                            * Note: Changes to permissions take effect immediately upon next login.
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-10 border-t border-slate-100 flex justify-end">
                <Button 
                    type="submit" 
                    disabled={processing} 
                    className="h-16 px-16 rounded-[2rem] bg-primary text-lg font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-3"
                >
                    {processing ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        user ? <Shield className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />
                    )}
                    {user ? 'Save Changes' : 'Create Team Account'}
                </Button>
            </div>
        </form>
    );
}
