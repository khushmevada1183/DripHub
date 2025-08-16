import { useEffect } from 'react';

// Hook to dynamically update document title
export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    
    // Cleanup: restore default title when component unmounts
    return () => {
      document.title = 'ShopHub - Your Online Store';
    };
  }, [title]);
};

// Hook to update meta description
export const useMetaDescription = (description) => {
  useEffect(() => {
    let metaDescription = document.querySelector('meta[name="description"]');
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    if (description) {
      metaDescription.content = description;
    }
  }, [description]);
};

// Hook to update meta keywords
export const useMetaKeywords = (keywords) => {
  useEffect(() => {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    
    if (keywords) {
      metaKeywords.content = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    }
  }, [keywords]);
};

// Combined hook for SEO meta data
export const useSEO = ({ title, description, keywords }) => {
  useDocumentTitle(title);
  useMetaDescription(description);
  useMetaKeywords(keywords);
};
