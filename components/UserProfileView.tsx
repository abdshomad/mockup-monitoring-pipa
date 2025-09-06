import React, { useState } from 'react';

const UserProfileView: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Operator 1',
        email: 'john.doe@pipelinecorp.com',
        role: 'Lead Operations Technician'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically make an API call to save the data
        console.log("Profile saved:", profile);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">User Profile</h2>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
                <div className="flex items-center space-x-6 mb-6">
                    <img src="https://picsum.photos/80" alt="User Avatar" className="w-20 h-20 rounded-full" />
                    <div>
                        <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                        <p className="text-slate-400">{profile.email}</p>
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                            <input type="text" name="name" value={profile.name} onChange={handleInputChange} disabled={!isEditing}
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 disabled:opacity-70" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                            <input type="email" name="email" value={profile.email} onChange={handleInputChange} disabled={!isEditing}
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 disabled:opacity-70" />
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
                            <input type="text" name="role" value={profile.role} onChange={handleInputChange} disabled={!isEditing}
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 disabled:opacity-70" />
                        </div>
                    </div>
                     <div className="flex justify-end space-x-3 mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSave} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                                    Save Changes
                                </button>
                            </>
                        ) : (
                             <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileView;