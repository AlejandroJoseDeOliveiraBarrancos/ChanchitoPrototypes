import Link from 'next/link'
import { UI_LABELS } from '@/lib/constants/ui'

export function Footer() {
  return (
    <footer className="bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              MVO Platform
            </h3>
            <p className="text-sm text-text-secondary">
              Validate your business idea in 48 hours
            </p>
          </div>

          <div>
            <h4 className="text-base font-medium text-text-primary mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ideas"
                  className="text-sm nav-link"
                >
                  {UI_LABELS.BROWSE_IDEAS}
                </Link>
              </li>
              <li>
                <Link
                  href="/upload"
                  className="text-sm nav-link"
                >
                  {UI_LABELS.SUBMIT_IDEA}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium text-text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm nav-link"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm nav-link"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-medium text-text-primary mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm nav-link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm nav-link"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-color text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} MVO Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

