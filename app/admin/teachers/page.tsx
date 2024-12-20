"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { teacherService } from '@/lib/services/teacherService';
import type { Teacher } from '@/lib/teacherData';
import { useNotification } from '../../components/Notification';
import ImageGallery from '../../components/ImageGallery';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const emptyTeacher = {
  name: '',
  image: '',
  qualifications: [''],
  position: '',
  experience: '',
  specialization: '',
  currentWork: '',
  location: '',
  hobbies: '',
  quotes: [''],
  achievements: ['']
};

// Rest of the file content remains exactly the same...
