'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/loading';
import { PageHeader } from '@/components/layout/header';
import {
    Plus,
    Edit2,
    Mail,
    User,
    GraduationCap,
    MoreVertical,
    X,
    Save,
} from 'lucide-react';

interface Student {
    id: string;
    email: string;
    display_name: string;
    grade_level: number;
    status: 'active' | 'inactive';
    created_at: string;
}

const mockStudents: Student[] = [
    {
        id: '1',
        email: 'emma@example.com',
        display_name: 'Emma',
        grade_level: 4,
        status: 'active',
        created_at: '2024-01-15',
    },
];

export default function AdminStudentsPage() {
    const [students, setStudents] = useState(mockStudents);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        display_name: '',
        password: '',
        grade_level: 4,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Would create student in database
        const newStudent: Student = {
            id: String(Date.now()),
            email: formData.email,
            display_name: formData.display_name,
            grade_level: formData.grade_level,
            status: 'active',
            created_at: new Date().toISOString().split('T')[0],
        };
        setStudents((prev) => [...prev, newStudent]);
        setShowAddForm(false);
        setFormData({ email: '', display_name: '', password: '', grade_level: 4 });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader
                title="Students"
                description="Manage student accounts and profiles"
                action={
                    <Button variant="primary" onClick={() => setShowAddForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Student
                    </Button>
                }
            />

            {/* Add Student Form */}
            {showAddForm && (
                <Card className="border-primary-300 bg-primary-50">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Add New Student</span>
                            <button onClick={() => setShowAddForm(false)}>
                                <X className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Student Name"
                                    placeholder="e.g., Emma"
                                    value={formData.display_name}
                                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="student@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    hint="At least 6 characters"
                                />
                                <Select
                                    label="Grade Level"
                                    value={String(formData.grade_level)}
                                    onChange={(e) => setFormData({ ...formData, grade_level: parseInt(e.target.value) })}
                                    options={[
                                        { value: '3', label: 'Grade 3' },
                                        { value: '4', label: 'Grade 4' },
                                        { value: '5', label: 'Grade 5' },
                                        { value: '6', label: 'Grade 6' },
                                    ]}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" type="button" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Create Student
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Students List */}
            {students.length === 0 ? (
                <EmptyState
                    icon={<User className="h-12 w-12" />}
                    title="No students yet"
                    description="Add your first student to get started"
                    action={
                        <Button variant="primary" onClick={() => setShowAddForm(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Student
                        </Button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.map((student) => (
                        <Card key={student.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xl">
                                            {student.display_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{student.display_name}</h3>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {student.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                </div>

                                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <Badge variant="primary" size="sm" className="flex items-center gap-1">
                                            <GraduationCap className="h-3 w-3" />
                                            Grade {student.grade_level}
                                        </Badge>
                                        <Badge
                                            variant={student.status === 'active' ? 'success' : 'default'}
                                            size="sm"
                                        >
                                            {student.status}
                                        </Badge>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
