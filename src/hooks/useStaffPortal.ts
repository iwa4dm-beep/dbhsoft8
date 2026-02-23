import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';

/**
 * স্টাফ প্রোডাক্ট ইমেজ হুক
 * Phase 11: Convex integration - APIs enabled and working
 */

/**
 * ইমেজ আপলোড হুক
 */
export const useUploadProductImage = () => {
  const uploadImageMutation = useMutation(api.staffProductImages.uploadProductImage);

  return async (imageData: {
    productId: string;
    barcode: string;
    serialNumber: string;
    variantId: number;
    imageUrl: string;
    imageKey: string;
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    description?: string;
    tags?: string[];
    position: number;
    branchId: string;
    branchName: string;
  }) => {
    try {
      const result = await uploadImageMutation(imageData);
      toast.success('ছবি সফলভাবে আপলোড হয়েছে');
      return { success: true, data: result };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ছবি আপলোড ব্যর্থ';
      toast.error(message);
      return { success: false, error: message };
    }
  };
};

/**
 * পণ্যের ইমেজ পান হুক
 */
export const useProductImages = (
  productId: string | null,
  options: { serialNumber?: string; variantId?: number; approvedOnly?: boolean } = {}
) => {
  const images = useQuery(
    productId ? api.staffProductImages.getProductImages : null,
    productId
      ? {
          productId,
          serialNumber: options.serialNumber,
          variantId: options.variantId,
          approvedOnly: options.approvedOnly,
        }
      : 'skip'
  );

  return images || [];
};

/**
 * স্ক্যান হিস্টরি হুক
 */
export const useScanHistory = (staffId: string | null, limit: number = 20) => {
  const history = useQuery(
    staffId ? api.staffProductImages.getScanHistory : null,
    staffId
      ? {
          staffId,
          limit,
        }
      : 'skip'
  );

  return history || [];
};

/**
 * স্টাফ স্ট্যাটিস্টিক্স হুক
 */
export const useStaffStats = (
  staffId: string | null,
  options: { branchId?: string; days?: number } = {}
) => {
  const stats = useQuery(
    staffId ? api.staffProductImages.getStaffStats : null,
    staffId
      ? {
          staffId,
          branchId: options.branchId,
          days: options.days,
        }
      : 'skip'
  );

  return stats || {
    scanCount: 0,
    uploadCount: 0,
    imageCount: 0,
    totalImageSize: 0,
    avgCompressionRatio: 0,
  };
};

/**
 * ইমেজ অনুমোদন হুক
 */
export const useApproveImage = () => {
  const approveMutation = useMutation(api.staffProductImages.approveImage);

  return async (imageId: string, approved: boolean) => {
    try {
      await approveMutation({ imageId, approved });
      toast.success(approved ? 'ছবি অনুমোদিত হয়েছে' : 'ছবি প্রত্যাখ্যান করা হয়েছে');
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'অপারেশন ব্যর্থ';
      toast.error(message);
      return { success: false, error: message };
    }
  };
};

/**
 * ইমেজ ডিলিট হুক
 */
export const useDeleteImage = () => {
  const deleteMutation = useMutation(api.staffProductImages.deleteImage);

  return async (imageId: string) => {
    try {
      const result = await deleteMutation({ imageId });
      toast.success('ছবি মুছে দেওয়া হয়েছে');
      return { success: true, data: result };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ছবি মুছতে ব্যর্থ';
      toast.error(message);
      return { success: false, error: message };
    }
  };
};

/**
 * স্টাফ প্রোডাক্ট সেটিংস হুক
 */
export const useStaffProductSettings = (branchId: string | null) => {
  const settings = useQuery(
    branchId ? api.staffProductSettings.getStaffProductSettings : null,
    branchId
      ? {
          branchId,
        }
      : 'skip'
  );

  const updateMutation = useMutation(api.staffProductSettings.updateStaffProductSettings);

  const updateSettings = async (newSettings: any) => {
    try {
      const result = await updateMutation({
        branchId: branchId!,
        ...newSettings,
      });
      toast.success('সেটিংস আপডেট হয়েছে');
      return { success: true, data: result };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'সেটিংস আপডেট ব্যর্থ';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const defaultSettings = {
    imageCompressionEnabled: true,
    targetImageSize: 100,
    jpegQuality: 85,
    maxImagesPerProduct: 3,
    enableFlashSupport: true,
  };

  return { settings: defaultSettings, updateSettings };
};
