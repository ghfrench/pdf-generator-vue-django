import { defineStore } from 'pinia';
import type { CustomTemplate } from '../types/types';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
	state: () => {
		const storedState = localStorage.getItem('authState');
		return storedState
			? JSON.parse(storedState)
			: {
				user: null,
				isAuthenticated: false,
				isAdmin: false,
				templates: [],
				pdfList: []
			};
	},
	actions: {
		async setCsrfToken() {
			await fetch('http://localhost:8000/api/set-csrf-token', {
				method: 'GET',
				credentials: 'include',
			});
		},

		async login(email: string, password: string, router: any = null) {
			const response = await fetch('http://localhost:8000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': getCSRFToken(),
				},
				body: JSON.stringify({
					email,
					password,
				}),
				credentials: 'include',
			});
			const data = await response.json();
			if (data.success) {
				this.isAuthenticated = true;
				this.saveState();
				if (router) {
					await router.push({
						name: 'home',
					});
				}
			} else {
				this.user = null;
				this.isAuthenticated = false;
				this.saveState();
			}
		},

		async logout(router: any = null) {
			try {
				const response = await fetch('http://localhost:8000/api/logout', {
					method: 'POST',
					headers: {
						'X-CSRFToken': getCSRFToken(),
					},
					credentials: 'include',
				});
				if (response.ok) {
					this.user = null;
					this.isAuthenticated = false;
					this.saveState();
					if (router) {
						await router.push({
							name: 'login',
						});
					}
				}
			} catch (error) {
				console.error('Logout failed', error);
				throw error;
			}
		},

		async fetchUser() {
			try {
				const response = await fetch('http://localhost:8000/api/user', {
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': getCSRFToken(),
					},
				});
				if (response.ok) {
					const data = await response.json();
					this.user = data;
					this.isAuthenticated = true;
					this.isAdmin = true;
				} else {
					this.user = null;
					this.isAuthenticated = false;
				}
			} catch (error) {
				console.error('Failed to fetch user', error);
				this.user = null;
				this.isAuthenticated = false;
			}
			this.saveState();
		},

		async saveTemplate(template: CustomTemplate) {
			try {
				if (!template.id) {
					return;
				}
				const existingTemplateIndex: number = this.templates.findIndex((existingTemplate: CustomTemplate) => existingTemplate.id === template.id);

				if (existingTemplateIndex) {
					this.templates.splice(existingTemplateIndex, 1, template);
				} else {
					this.templates.push(template);
				}
			} catch (error) {
				console.error('Failed to save template', error);
			}
			this.saveState();
		},

		async clearTemplates() {
			try {
				this.templates = [];
			} catch (error) {
				console.error('Failed to clear templates', error);
			}
			this.saveState();
		},

		async uploadFile(formData: FormData) {
			try {
				const response = await axios.post('http://localhost:8000/api/upload/', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
			} catch (error) {
				console.error('Failed to upload file', error);
			}
			this.saveState();
		},

		async fetchFiles() {
			try {
				const response = await axios.get('http://localhost:8000/api/list/');
				this.pdfList = response.data;
			} catch (error) {
				console.error('Failed to fetch files', error);
			}
			this.saveState();
		},

		async downloadFile(pdfId: number) {
			try {
				console.log('trying');
				const response = await axios.get(`http://localhost:8000/api/download/${pdfId}/`);
			} catch (error) {
				console.error('Failed to download file', error);
			}
			this.saveState();
		},

		saveState() {
			/*
				  We save state to local storage to keep the
				  state when the user reloads the page.

				  This is a simple way to persist state. For a more robust solution,
				  use pinia-persistent-state.
				   */
			localStorage.setItem(
				'authState',
				JSON.stringify({
					user: this.user,
					isAuthenticated: this.isAuthenticated,
					isAdmin: this.isAdmin,
					templates: this.templates,
					pdfList: this.pdfList
				}),
			);
		},
	},
});

export function getCSRFToken() {
	/*
	  We get the CSRF token from the cookie to include in our requests.
	  This is necessary for CSRF protection in Django.
	   */
	const name = 'csrftoken';
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === name + '=') {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	if (cookieValue === null) {
		throw 'Missing CSRF cookie.';
	}
	return cookieValue;
}
