import { z } from 'zod';
import { CmsPage } from './types';
import { fetchJson } from '../services/dashboardService';

export class CmsService {
  /**
   * Fetches the CMS page payload by ID.
   * This points to the mock-server for now.
   */
  async getPage(pageId: string): Promise<CmsPage> {
    // We use the centralized fetchJson which automatically handles the mobile
    // API URL and HTTP client injection configured in dashboardService.
    const data = await fetchJson(`/cms/pages/${pageId}`, z.any());
    return data as CmsPage;
  }
}

export const cmsService = new CmsService();
